import "./layout.css";

interface RoleShellProps {
  /** Rendered at the top: TopNav (staff) or MobileHeader (visitor). */
  header: React.ReactNode;
  /** Optional Sidebar for officer/admin desktop layouts. */
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}

export function RoleShell({ header, sidebar, children }: RoleShellProps) {
  return (
    <div className={`role-shell ${sidebar ? "role-shell--with-sidebar" : ""}`}>
      {header}
      <div className="role-shell__body">
        {sidebar}
        <div className="role-shell__content">{children}</div>
      </div>
    </div>
  );
}
