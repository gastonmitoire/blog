import type { User } from "@prisma/client";

type Props = {
  user: User | null;
};

export function UserMenu(props: Props) {
  const { user } = props;

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div>
      <p>Username: {user.username}</p>
      {/* ... render other user data ... */}
    </div>
  );
}
