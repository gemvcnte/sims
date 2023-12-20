import React, { useState } from "react";
import RoleSelectionButton from "./RoleSelectionButton";
import LoginForm from "./LoginForm";

function RoleSelectionContainer() {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  return (
    <main className="-mt-8 px-8">
      {!selectedRole && (
        <section className="mx-auto mt-12 flex max-w-[350px] flex-col gap-4 rounded-lg p-4">
          <RoleSelectionButton
            role="Student"
            hasBorder={true}
            onClick={handleRoleSelection}
          />
          <RoleSelectionButton
            role="Teacher"
            hasBorder={true}
            onClick={handleRoleSelection}
          />
          <RoleSelectionButton
            role="Admin"
            hasBorder={true}
            onClick={handleRoleSelection}
          />
          {/* <RoleSelectionButton
            role="School Head"
            hasBorder={true}
            onClick={handleRoleSelection}
          /> */}
        </section>
      )}

      {selectedRole && (
        <section className="mx-auto mt-12 flex max-w-[350px] flex-col gap-4 rounded-lg p-4">
          <LoginForm role={selectedRole} setSelectedRole={setSelectedRole} />
        </section>
      )}
    </main>
  );
}

export default RoleSelectionContainer;
