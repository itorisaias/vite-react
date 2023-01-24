import { Outlet } from "react-router-dom";

export default function AuthTemplate() {
  return (
    <>
      <div style={{ background: 'red' }}>
        Side bar
      </div>
      <div style={{ background: 'blue' }}>
        <Outlet />
      </div>
    </>
  );
}
