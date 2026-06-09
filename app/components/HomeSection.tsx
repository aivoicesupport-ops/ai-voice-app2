export default function HomeSection({
  user,
}: {
  user: any;
}) {
  return (
    <>
      <h1 className="text-6xl font-bold mb-4 text-center">
        AI Voice Generator
      </h1>
    {user && (
  <p className="text-zinc-400 mt-4 mb-6">
    Welcome, {user.displayName}
  </p>
)}
      <p className="text-zinc-400 text-center mb-10 max-w-xl">
        Convert text into realistic AI speech instantly.
      </p>
      
    </>
  );
}