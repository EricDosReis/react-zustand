import { useCurrentLesson } from "../hooks";
import { usePlayerStore } from "../store";

export function Header() {
  const { currentLesson, currentModule } = useCurrentLesson();
  const isLoading = usePlayerStore((state) => state.isLoading);

  if (isLoading) {
    return <h1 className="text-2xl font-bold">Carregando...</h1>;
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>

      <span className="text-sm text-zinc-400">
        Módulo "{currentModule?.title}"
      </span>
    </div>
  );
}
