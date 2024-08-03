"use client";
import React, { useState, useEffect } from 'react';
import MinecraftInput from '@/components/atoms/Inputs/MinecraftInput';
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

interface Content {
  text?: string | null;
  code?: string | null;
  position: number;
  video?: string | null;
  imageFile?: File | null;
}

interface Chapter {
  title?: string | null;
  description?: string | null;
  position: number;
  contents: Content[];
}

interface Tutorial {
  id?: number | null;
  title?: string | null;
  estimated_time?: string | null;
  difficulty?: string | null;
  game?: string | null;
  chapters: Chapter[];
  position: number;
  imageFile?: File | null;
}

interface CreateTutorialFormProps {
  defaultValues?: Tutorial;
  edit?: boolean;
}

// Composant de formulaire
const CreateTutorialForm: React.FC<CreateTutorialFormProps> = ({ defaultValues, edit = false }) => {
  const [tutorial, setTutorial] = useState<Tutorial>({
    title: '',
    estimated_time: '',
    difficulty: '',
    game: '',
    chapters: [],
    position: 1,
  });

  useEffect(() => {
    if (defaultValues) {
      setTutorial({
        ...defaultValues,
        chapters: defaultValues.chapters || []
      });
    }
  }, [defaultValues]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTutorial(prev => ({ ...prev, [name]: value }));
  };

  const convertToFormData = (t: Tutorial): FormData => {
    const formData = new FormData();
    // Ajout des propriétés simples
    formData.append('title', t.title ?? '');
    formData.append('estimated_time', t.estimated_time ?? '');
    formData.append('difficulty', t.difficulty ?? '');
    formData.append('game', t.game ?? '');
    formData.append('position', t.position.toString());
  
    // Ajout des chapters et contenus
    tutorial.chapters.forEach((chapter, chapterIndex) => {
      formData.append(`chapters[${chapterIndex}].title`, chapter.title ?? '');
      formData.append(`chapters[${chapterIndex}].description`, chapter.description ?? '');
      formData.append(`chapters[${chapterIndex}].position`, chapter.position.toString());
  
      chapter.contents.forEach((content, contentIndex) => {
        formData.append(`chapters[${chapterIndex}].contents[${contentIndex}].text`, content.text || '');
        formData.append(`chapters[${chapterIndex}].contents[${contentIndex}].code`, content.code || '');
        formData.append(`chapters[${chapterIndex}].contents[${contentIndex}].position`, content.position.toString());
        formData.append(`chapters[${chapterIndex}].contents[${contentIndex}].video`, content.video || '');
      });
    });
    return formData;
  };

  const handleChapterChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedChapters = [...tutorial.chapters];
    updatedChapters[index] = { ...updatedChapters[index], [name]: value };
    setTutorial(prev => ({ ...prev, chapters: updatedChapters }));
  };

  const handleContentChange = (chapterIndex: number, contentIndex: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedChapters = [...tutorial.chapters];
    const updatedContents = [...updatedChapters[chapterIndex].contents];
    updatedContents[contentIndex] = { ...updatedContents[contentIndex], [name]: value };
    updatedChapters[chapterIndex] = { ...updatedChapters[chapterIndex], contents: updatedContents };
    setTutorial(prev => ({ ...prev, chapters: updatedChapters }));
  };

  const addChapter = () => {
    const newChapter: Chapter = {
      title: '',
      description: '',
      position: tutorial.chapters.length + 1,
      contents: []
    };
    setTutorial(prev => ({ ...prev, chapters: [...prev.chapters, newChapter] }));
  };

  const addContentToChapter = (chapterIndex: number) => {
    const newContent: Content = {
      text: '',
      code: '',
      position: tutorial.chapters[chapterIndex].contents.length + 1,
      video: null,
    };
    const updatedChapters = [...tutorial.chapters];
    const updatedContents = [...updatedChapters[chapterIndex].contents, newContent];
    updatedChapters[chapterIndex] = { ...updatedChapters[chapterIndex], contents: updatedContents };
    setTutorial(prev => ({ ...prev, chapters: updatedChapters }));
  };

  const removeChapter = (index: number) => {
    const updatedChapters = tutorial.chapters.filter((_, i) => i !== index);
    setTutorial(prev => ({ ...prev, chapters: updatedChapters }));
  };

  const removeContent = (chapterIndex: number, contentIndex: number) => {
    const updatedChapters = [...tutorial.chapters];
    const updatedContents = updatedChapters[chapterIndex].contents.filter((_, i) => i !== contentIndex);
    updatedChapters[chapterIndex] = { ...updatedChapters[chapterIndex], contents: updatedContents };
    setTutorial(prev => ({ ...prev, chapters: updatedChapters }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      const url = edit 
        ? `/api/administration/tuto/edit/${tutorial.id}`
        : '/api/administration/tuto/create';

      //const formData = convertToFormData(tutorial);
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(tutorial),
      });

      if (response.ok) {
        // Gérer la réponse réussie
        toast.success("Succès !");
      } else {
        // Gérer l'erreur
        console.error("Erreur lors de la soumission");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <MinecraftInput
        name="title"
        label="Title"
        value={tutorial.title || ''}
        onChange={handleInputChange}
        className="mb-4"
      />
      <MinecraftInput
        name="estimated_time"
        label="Estimated Time"
        value={tutorial.estimated_time || ''}
        onChange={handleInputChange}
        className="mb-4"
      />
      <MinecraftInput
        name="difficulty"
        label="Difficulty"
        value={tutorial.difficulty || ''}
        onChange={handleInputChange}
        className="mb-4"
      />
      <MinecraftInput
        name="game"
        label="Game"
        value={tutorial.game || ''}
        onChange={handleInputChange}
        className="mb-4"
      />
      <MinecraftInput
        name="position"
        label="Position"
        value={tutorial.position}
        type="number"
        onChange={handleInputChange}
        className="mb-4"
      />
      <MinecraftInput
        name="imageFile"
        label="Image File"
        type="file"
        onChange={(e: any) => setTutorial(prev => ({ ...prev, imageFile: e.target.files[0] }))}
        className="mb-4"
      />

      {tutorial.chapters.map((chapter, chapterIndex) => (
        <div key={chapterIndex} className="mt-4 border-4 border-t-white border-l-white border-b-custom-dark-grey border-r-custom-dark-grey p-4">
          <h3 className='minecraftText'>Chapter {chapterIndex + 1}</h3>
          <MinecraftButton
            type="button"
            label="Supprimer le chapter"
            onClick={() => removeChapter(chapterIndex)}
            className="bg-dirt text-white p-2"
          />
          <MinecraftInput
            name="title"
            label={`Chapter Title ${chapterIndex + 1}`}
            value={chapter.title || ''}
            onChange={(e: any) => handleChapterChange(chapterIndex, e)}
            className="mb-4"
          />
          <MinecraftInput
            name="description"
            label={`Chapter Description ${chapterIndex + 1}`}
            value={chapter.description || ''}
            onChange={(e: any) => handleChapterChange(chapterIndex, e)}
            className="mb-4"
            type="textarea"
          />
          {chapter.contents.map((content, contentIndex) => (
            <div key={contentIndex} className="mt-4 border-2 border-t-white border-l-white border-b-custom-dark-grey border-r-custom-dark-grey p-4">
              <h4 className='minecraftText'>Contenu {contentIndex + 1}</h4>
              <MinecraftButton
                type="button"
                label="Supprimer le contenu"
                onClick={() => removeContent(chapterIndex, contentIndex)}
                className="bg-dirt"
              />
              <MinecraftInput
                name="text"
                label={`Content Text ${contentIndex + 1}`}
                value={content.text || ''}
                onChange={(e: any) => handleContentChange(chapterIndex, contentIndex, e)}
                className="mb-4"
                type="textarea"
              />
              <MinecraftInput
                name="code"
                label={`Content Code ${contentIndex + 1}`}
                value={content.code || ''}
                onChange={(e: any) => handleContentChange(chapterIndex, contentIndex, e)}
                className="mb-4"
                type="textarea"
              />
              <MinecraftInput
                name="video"
                label={`Content Video URL ${contentIndex + 1}`}
                value={content.video || ''}
                onChange={(e: any) => handleContentChange(chapterIndex, contentIndex, e)}
                className="mb-4"
              />
              <MinecraftInput
                name="position"
                label={`Content Position ${contentIndex + 1}`}
                value={content.position}
                type="number"
                onChange={(e: any) => handleContentChange(chapterIndex, contentIndex, e)}
                className="mb-4"
              />
              <MinecraftInput
                name="imageFile"
                label="Image File"
                type="file"
                onChange={(e: any) => setTutorial(prev => ({ ...prev, imageFile: e.target.files[0] }))}
                className="mb-4"
              />
            </div>
          ))}
          <MinecraftButton
            type="button"
            label="Ajouter un contenu"
            onClick={() => addContentToChapter(chapterIndex)}
            className="bg-deepslate"
          />
        </div>
      ))}
      <MinecraftButton
        type="button"
        label="Ajouter un chapter"
        onClick={addChapter}
        className="bg-deepslate"
      />

      <MinecraftButton
        type="submit"
        label="Creer le tutoriel"
        className="mt-4 bg-green-500 text-white p-2 rounded"
      />
    </form>
  );
};

export default CreateTutorialForm;
