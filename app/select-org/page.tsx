"use client";

import { OrganizationList } from "@clerk/nextjs";

export default function SelectOrgPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <OrganizationList
        hidePersonal
        afterSelectOrganizationUrl="/docs"
        afterCreateOrganizationUrl="/docs"
      />
    </div>
  );
}
