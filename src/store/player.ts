import { create } from "zustand";

import { api } from "../lib/axios";

interface Lesson {
  id: string;
  title: string;
  duration: string;
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface Course {
  id: number;
  modules: Module[];
}

type PlayArgs = {
  lessonIndex: number;
  moduleIndex: number;
};

export interface PlayerState {
  course: Course | null;
  currentLessonIndex: number;
  currentModuleIndex: number;
  isLoading: boolean;
  load: () => Promise<void>;
  play: (args: PlayArgs) => void;
  next: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentLessonIndex: 0,
    currentModuleIndex: 0,
    isLoading: true,

    async load() {
      set({ isLoading: true });

      const response = await api.get("/courses/1");

      set({
        course: response.data,
        isLoading: false,
      });
    },

    play({ lessonIndex, moduleIndex }) {
      set({
        currentLessonIndex: lessonIndex,
        currentModuleIndex: moduleIndex,
      });
    },

    next() {
      const { currentLessonIndex, currentModuleIndex, course } = get();

      const nextLessonIndex = currentLessonIndex + 1;
      const nextLesson =
        course?.modules[currentModuleIndex].lessons[nextLessonIndex];

      if (nextLesson) {
        set({
          currentLessonIndex: nextLessonIndex,
        });

        return;
      }

      const nextModuleIndex = currentModuleIndex + 1;
      const nextModule = course?.modules[nextModuleIndex];

      if (nextModule) {
        set({
          currentLessonIndex: 0,
          currentModuleIndex: nextModuleIndex,
        });
      }

      return;
    },
  };
});
