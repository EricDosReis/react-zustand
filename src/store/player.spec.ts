import { beforeEach, describe, expect, it } from "vitest";

import { usePlayerStore } from ".";

const courseMock = {
  id: 1,
  modules: [
    {
      id: 1,
      title: "Iniciando com React",
      lessons: [
        { id: "Jai8w6K_GnY", title: "CSS Modules", duration: "13:45" },
        {
          id: "w-DW4DhDfcw",
          title: "Estilização do Post",
          duration: "10:05",
        },
      ],
    },
    {
      id: 2,
      title: "Estrutura da aplicação",
      lessons: [
        {
          id: "gE48FQXRZ_o",
          title: "Componente: Comment",
          duration: "13:45",
        },
        { id: "Ng_Vk4tBl0g", title: "Responsividade", duration: "10:05" },
      ],
    },
  ],
};

const initialStateMock = usePlayerStore.getState();

describe("player store", () => {
  beforeEach(() => {
    usePlayerStore.setState(initialStateMock);
  });

  it("should be able to play", () => {
    const { play } = usePlayerStore.getState();

    play({ lessonIndex: 1, moduleIndex: 2 });

    const { currentLessonIndex, currentModuleIndex } =
      usePlayerStore.getState();

    expect(currentLessonIndex).toEqual(1);
    expect(currentModuleIndex).toEqual(2);
  });

  it("should be able to play next video automatically", () => {
    usePlayerStore.setState({ course: courseMock });

    const { next } = usePlayerStore.getState();

    next();

    const { currentLessonIndex, currentModuleIndex } =
      usePlayerStore.getState();

    expect(currentLessonIndex).toEqual(1);
    expect(currentModuleIndex).toEqual(0);
  });

  it("should be able to jump to the next module automatically", () => {
    usePlayerStore.setState({ course: courseMock, currentLessonIndex: 1 });

    const { next } = usePlayerStore.getState();

    next();

    const { currentLessonIndex, currentModuleIndex } =
      usePlayerStore.getState();

    expect(currentLessonIndex).toEqual(0);
    expect(currentModuleIndex).toEqual(1);
  });

  it("should not update the current module and lesson index if there is no next lesson available", () => {
    usePlayerStore.setState({
      course: courseMock,
      currentLessonIndex: 1,
      currentModuleIndex: 1,
    });

    const { next } = usePlayerStore.getState();

    next();

    const { currentLessonIndex, currentModuleIndex } =
      usePlayerStore.getState();

    expect(currentLessonIndex).toEqual(1);
    expect(currentModuleIndex).toEqual(1);
  });
});
