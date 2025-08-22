"use client";

import PageHeader from "@/components/page/profile/page-header";
import ProfilePhoto from "@/components/page/profile/profile-photo";
import useProfile from "@/hooks/useProfile";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const { dataUser } = useProfile();

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <PageHeader
        title="Profile Saya"
        description="Kelola profil Anda di sini"
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-8 gap-4">
          {/* Profile Photo Section */}
          <ProfilePhoto dataUser={dataUser} />

          {/* Form Section */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
