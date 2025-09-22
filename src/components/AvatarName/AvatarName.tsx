export default function AvatarName({ name, avatarUrl }: { name: string; avatarUrl?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs">{name[0]}</div>
        )}
      </div>
      <span className="truncate">{name}</span>
    </div>
  );
}
