-- ==============================================================================
-- GODIRECT PLATFORM - COMPLETE SUPABASE DATABASE SCHEMA & RLS POLICIES
-- Target: Supabase Postgres
-- ==============================================================================

-- 1. Enable Necessary Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. ENUM TYPES
-- ==============================================================================
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'landlord', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE property_type AS ENUM ('penthouse', 'villa', 'apartment', 'duplex', 'commercial', 'land');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE property_status AS ENUM ('active', 'unlisted', 'draft', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE booking_status AS ENUM ('pending_payment', 'confirmed', 'checked_in', 'completed', 'cancelled', 'disputed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE escrow_status AS ENUM ('vaulted', 'inspection_active', 'released', 'refunded', 'frozen_dispute');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE withdrawal_status AS ENUM ('pending', 'processing', 'completed', 'failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE dispute_status AS ENUM ('open', 'under_review', 'resolved_refund', 'resolved_payout', 'dismissed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 3. PROFILES TABLE (Linked to auth.users)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role user_role NOT NULL DEFAULT 'user',
    phone TEXT,
    avatar_url TEXT,
    bvn_verified BOOLEAN DEFAULT FALSE,
    nin_verified BOOLEAN DEFAULT FALSE,
    kyc_status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 4. PROPERTIES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT UNIQUE,
    description TEXT,
    type property_type NOT NULL DEFAULT 'apartment',
    is_short_let BOOLEAN NOT NULL DEFAULT FALSE,
    price_per_night NUMERIC(15, 2) DEFAULT 0.00,
    price_per_year NUMERIC(15, 2) DEFAULT 0.00,
    currency TEXT NOT NULL DEFAULT 'NGN',
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Nigeria',
    beds INT DEFAULT 1,
    baths NUMERIC(3, 1) DEFAULT 1.0,
    max_guests INT DEFAULT 2,
    sqft INT DEFAULT 0,
    amenities TEXT[] DEFAULT '{}',
    images TEXT[] DEFAULT '{}',
    deed_doc_url TEXT,
    verification_status verification_status DEFAULT 'pending',
    status property_status DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 5. BOOKINGS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_code TEXT UNIQUE NOT NULL,
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE RESTRICT,
    guest_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    host_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    total_guests INT DEFAULT 1,
    gross_amount NUMERIC(15, 2) NOT NULL,
    platform_fee NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    net_host_amount NUMERIC(15, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'NGN',
    status booking_status NOT NULL DEFAULT 'pending_payment',
    access_code TEXT,
    check_in_instructions TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 6. ESCROWS TABLE (GoDirect Security Engine)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.escrows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    escrow_code TEXT UNIQUE NOT NULL,
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    guest_id UUID NOT NULL REFERENCES public.profiles(id),
    host_id UUID NOT NULL REFERENCES public.profiles(id),
    gross_amount NUMERIC(15, 2) NOT NULL,
    platform_fee NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    net_payout NUMERIC(15, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'NGN',
    status escrow_status NOT NULL DEFAULT 'vaulted',
    inspection_starts_at TIMESTAMPTZ,
    inspection_expires_at TIMESTAMPTZ,
    released_at TIMESTAMPTZ,
    gateway TEXT DEFAULT 'paystack',
    gateway_reference TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 7. WALLETS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.wallets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    currency TEXT NOT NULL DEFAULT 'NGN',
    available_balance NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    escrow_locked_balance NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    total_withdrawn NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 8. BANK ACCOUNTS TABLE (NUBAN / Payout Rails)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.bank_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    bank_name TEXT NOT NULL,
    bank_code TEXT NOT NULL,
    account_number VARCHAR(10) NOT NULL,
    account_name TEXT NOT NULL,
    recipient_code TEXT,
    is_default BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 9. WITHDRAWALS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.withdrawals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_id UUID NOT NULL REFERENCES public.wallets(id),
    user_id UUID NOT NULL REFERENCES public.profiles(id),
    bank_account_id UUID NOT NULL REFERENCES public.bank_accounts(id),
    amount NUMERIC(15, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'NGN',
    fee NUMERIC(15, 2) DEFAULT 0.00,
    status withdrawal_status NOT NULL DEFAULT 'pending',
    gateway_transfer_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- ==============================================================================
-- 10. DISPUTES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.disputes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id),
    escrow_id UUID NOT NULL REFERENCES public.escrows(id),
    initiator_id UUID NOT NULL REFERENCES public.profiles(id),
    defendant_id UUID NOT NULL REFERENCES public.profiles(id),
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    evidence_urls TEXT[] DEFAULT '{}',
    status dispute_status NOT NULL DEFAULT 'open',
    resolution_notes TEXT,
    resolved_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

-- ==============================================================================
-- 11. REVIEWS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    booking_id UUID NOT NULL REFERENCES public.bookings(id),
    guest_id UUID NOT NULL REFERENCES public.profiles(id),
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    host_reply TEXT,
    host_replied_at TIMESTAMPTZ,
    helpful_votes INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 12. CONVERSATIONS & MESSAGES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES public.properties(id),
    participant_1 UUID NOT NULL REFERENCES public.profiles(id),
    participant_2 UUID NOT NULL REFERENCES public.profiles(id),
    last_message TEXT,
    last_message_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id),
    message_text TEXT NOT NULL,
    media_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 13. WISHLISTS & SAVED SEARCHES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.wishlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, property_id)
);

CREATE TABLE IF NOT EXISTS public.saved_searches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    filter_city TEXT,
    filter_type property_type,
    min_price NUMERIC(15,2),
    max_price NUMERIC(15,2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 14. SCHEDULED TOURS & AGENT ESCORTED INSPECTIONS (ANTI-DISINTERMEDIATION)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.scheduled_tours (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    host_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    assigned_agent_name TEXT DEFAULT 'GoDirect Verified Field Escort',
    assigned_agent_phone TEXT DEFAULT '+234 800 GODIRECT',
    tour_date DATE NOT NULL,
    tour_time TEXT NOT NULL,
    tour_type TEXT DEFAULT 'physical', -- 'physical' | 'video_tour'
    security_checkin_code VARCHAR(6) NOT NULL DEFAULT LPAD(FLOOR(RANDOM()*1000000)::TEXT, 6, '0'),
    escort_compliance_status TEXT DEFAULT 'agent_assigned', -- 'agent_assigned' | 'in_progress' | 'verified_completed'
    status TEXT DEFAULT 'confirmed', -- 'pending' | 'confirmed' | 'completed' | 'cancelled'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 14. AUTOMATIC USER PROFILE & WALLET CREATION TRIGGER
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- 1. Insert into public.profiles
    INSERT INTO public.profiles (id, email, full_name, role, phone, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        CASE 
            WHEN NEW.raw_user_meta_data->>'role' = 'admin' THEN 'admin'::user_role
            WHEN NEW.raw_user_meta_data->>'role' = 'landlord' THEN 'landlord'::user_role
            ELSE 'user'::user_role
        END,
        NEW.raw_user_meta_data->>'phone',
        NEW.raw_user_meta_data->>'avatar_url'
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        role = EXCLUDED.role,
        phone = EXCLUDED.phone;

    -- 2. Automatically create NGN wallet for new user
    INSERT INTO public.wallets (user_id, currency, available_balance, escrow_locked_balance, total_withdrawn)
    VALUES (NEW.id, 'NGN', 0.00, 0.00, 0.00)
    ON CONFLICT (user_id) DO NOTHING;

    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Fail-safe: Always allow auth user creation even if profile table is pending setup
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if already exists then recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 15. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escrows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_searches ENABLE ROW LEVEL SECURITY;

-- Helper function: Is current user an admin?
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --- PROFILES POLICIES ---
CREATE POLICY "Public profiles are readable by authenticated users"
ON public.profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Admins can do everything on profiles"
ON public.profiles FOR ALL TO authenticated USING (public.is_admin());

-- --- PROPERTIES POLICIES ---
CREATE POLICY "Anyone can view active properties"
ON public.properties FOR SELECT USING (status = 'active' OR auth.uid() = host_id OR public.is_admin());

CREATE POLICY "Landlords can insert their own properties"
ON public.properties FOR INSERT TO authenticated WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Landlords can update their own properties"
ON public.properties FOR UPDATE TO authenticated USING (auth.uid() = host_id OR public.is_admin());

-- --- BOOKINGS POLICIES ---
CREATE POLICY "Users can view bookings they are involved in"
ON public.bookings FOR SELECT TO authenticated 
USING (auth.uid() = guest_id OR auth.uid() = host_id OR public.is_admin());

CREATE POLICY "Guests can create bookings"
ON public.bookings FOR INSERT TO authenticated WITH CHECK (auth.uid() = guest_id);

CREATE POLICY "Parties or Admins can update booking status"
ON public.bookings FOR UPDATE TO authenticated 
USING (auth.uid() = guest_id OR auth.uid() = host_id OR public.is_admin());

-- --- ESCROWS POLICIES ---
CREATE POLICY "Parties involved can view escrow status"
ON public.escrows FOR SELECT TO authenticated 
USING (auth.uid() = guest_id OR auth.uid() = host_id OR public.is_admin());

-- --- WALLETS POLICIES ---
CREATE POLICY "Users can view own wallet"
ON public.wallets FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can insert own wallet"
ON public.wallets FOR INSERT WITH CHECK (true);

-- --- BANK ACCOUNTS POLICIES ---
CREATE POLICY "Users can manage own bank accounts"
ON public.bank_accounts FOR ALL TO authenticated USING (auth.uid() = user_id);

-- --- WITHDRAWALS POLICIES ---
CREATE POLICY "Hosts can view and request withdrawals"
ON public.withdrawals FOR ALL TO authenticated USING (auth.uid() = user_id OR public.is_admin());

-- --- DISPUTES POLICIES ---
CREATE POLICY "Involved parties and Admins can view disputes"
ON public.disputes FOR ALL TO authenticated 
USING (auth.uid() = initiator_id OR auth.uid() = defendant_id OR public.is_admin());

-- --- REVIEWS POLICIES ---
CREATE POLICY "Anyone can view reviews"
ON public.reviews FOR SELECT USING (true);

CREATE POLICY "Verified guests can write reviews"
ON public.reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = guest_id);

CREATE POLICY "Hosts can reply to reviews on their properties"
ON public.reviews FOR UPDATE TO authenticated 
USING (auth.uid() IN (SELECT host_id FROM public.properties WHERE id = property_id) OR public.is_admin());

-- --- CHAT POLICIES ---
CREATE POLICY "Participants can view conversations"
ON public.conversations FOR SELECT TO authenticated 
USING (auth.uid() = participant_1 OR auth.uid() = participant_2 OR public.is_admin());

CREATE POLICY "Participants can view messages"
ON public.messages FOR SELECT TO authenticated 
USING (conversation_id IN (
    SELECT id FROM public.conversations WHERE participant_1 = auth.uid() OR participant_2 = auth.uid()
) OR public.is_admin());

CREATE POLICY "Participants can send messages"
ON public.messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = sender_id);

-- --- WISHLISTS POLICIES ---
CREATE POLICY "Users can manage own wishlist"
ON public.wishlists FOR ALL TO authenticated USING (auth.uid() = user_id);

-- --- SAVED SEARCHES POLICIES ---
CREATE POLICY "Users can manage own saved searches"
ON public.saved_searches FOR ALL TO authenticated USING (auth.uid() = user_id);

-- --- SCHEDULED TOURS (AGENT ESCORTED) POLICIES ---
CREATE POLICY "Users and Hosts can view own scheduled tours"
ON public.scheduled_tours FOR ALL TO authenticated 
USING (auth.uid() = user_id OR auth.uid() = host_id OR public.is_admin());

-- ==============================================================================
-- 16. ENABLE REALTIME MESSAGING FOR CHAT
-- ==============================================================================
-- Allow real-time event broadcasting on the messages and conversations tables
DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.conversations;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- SCHEMA CREATION COMPLETE!
-- ==============================================================================
