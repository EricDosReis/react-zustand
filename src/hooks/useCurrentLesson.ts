import { usePlayerStore } from "../store";

export const useCurrentLesson = () => {
  return usePlayerStore((state) => {
    const { currentLessonIndex, currentModuleIndex } = state;

    const currentModule = state.course?.modules[currentModuleIndex];
    const currentLesson = currentModule?.lessons[currentLessonIndex];

    return { currentLesson, currentModule };
  });
};
