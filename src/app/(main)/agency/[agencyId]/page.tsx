import React from "react";

function Page({ params }: { params: { agencyId: string } }) {
  return <div>agency id :{params.agencyId}</div>;
}

export default Page;
