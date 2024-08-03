"use client";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';
import MinecraftHN from '@/components/atoms/Texts/Title/MinecraftHN';
import MinecraftText from '@/components/atoms/Texts/TextBlock/MinecraftText';
import Card from '@/components/molecules/Card/Card';
import Form from '@/components/molecules/Forms/Form';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

async function getConnectedUser() {
  const token = Cookies.get('token');
  console.log(token);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return toast.error('API URL non configuree');
  }
  try {
    const response = await fetch(`${apiUrl}/user/connected`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    });
    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      toast.error(`Erreur de connexion: ${errorData}`);
      return null;
    }
  } catch (error) {
    toast.error(`Erreur reseau: ${error}`);
    return null;
  }
}

async function getProgress() {
  const token = Cookies.get('token');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return toast.error('API URL non configuree');
  }
  try {
    const response = await fetch(`/api/user/progress`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      toast.error(`Erreur de connexion: ${errorData}`);
      return null;
    }
  } catch (error) {
    toast.error(`Erreur reseau: ${error}`);
    return null;
  }
}



const formFields = [
  { name: 'username', label: "Nom d'utilisateur", placeholder: "Nom d'utilisateur", type: 'text', required: false },
  { name: 'email', label: 'Email', placeholder: 'E-mail', type: 'text', required: false },
  { name: 'currentPassword', label: 'Mot de passe actuel', placeholder: 'Mot de passe actuel', type: 'password', required: true },
  { name: 'password', label: 'Nouveau mot de passe', placeholder: 'Nouveau mot de passe', type: 'password', required: false },
  { name: 'confirmPassword', label: 'Confirmez votre nouveau mot de passe', placeholder: 'Confirmez nouveau mot de passe', type: 'password', required: false },
];

const Profil = () => {
  const [userData, setUserData] = useState<{ [key: string]: string } | null>(null);
  const [progress, setProgress] = useState<any>(null);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction pour traiter et calculer la progression
  const calculateTutorialProgress = () => {
    if (!progress || progress === "Vous n'avez pas encore fais de tutoriel.") return [];

    const { progress: progressList, nbChapters, idChapters, tutorialTitles, chapterTitles } = progress;

    const completedChapters = progressList.reduce((acc: Record<string, Set<number>>, item: any) => {
      const tutorialId = Object.keys(idChapters).find(id => idChapters[id].includes(item.chapter.id));
      if (!tutorialId) return acc;

      if (!acc[tutorialId]) {
        acc[tutorialId] = new Set<number>();
      }
      if (item.isCompleted) {
        acc[tutorialId].add(item.chapter.id);
      }
      return acc;
    }, {});

    return Object.keys(nbChapters).map(tutorialId => {
      const totalChapters = nbChapters[tutorialId];
      const completedChaptersCount = completedChapters[tutorialId] ? completedChapters[tutorialId].size : 0;
      const percentage = totalChapters ? (completedChaptersCount / totalChapters) * 100 : 0;
      return {
        id: tutorialId,
        title: tutorialTitles[tutorialId] || `Tutoriel ${tutorialId}`,
        totalChapters,
        completedChapters: completedChaptersCount,
        percentage: percentage.toFixed(2),
        chapters: idChapters[tutorialId].map((chapterId: number) => ({
          id: chapterId,
          title: chapterTitles[chapterId] || `Chapitre ${chapterId}`,
          isCompleted: progressList.some((p: any) => p.chapter.id === chapterId && p.isCompleted)
        }))
      };
    });
  };

  // Fonction pour gérer la soumission du formulaire
  async function handleSubmit(values: { [key: string]: string }) {
    const { username, email, password, currentPassword, confirmPassword } = values;
    const oldEmail = userData?.email;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (!apiUrl) {
      return toast.error('API URL non configuree');
    }
    
    try {
      if(!userData){
        return toast.error('Utilisateur non trouve');
      }
      const response = await fetch(`${apiUrl}/user/edit/${userData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${Cookies.get('token')}` },
        body: JSON.stringify({ username, email, password, currentPassword, confirmPassword , oldEmail }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast.success('Profil mis à jour');
        Cookies.remove('token');
        router.push('/login');
        toast.info('Veuillez vous reconnecter');
      } else {
        const errorData = await response.json();
        console.log('Erreur de connexion:', errorData);
      }
    } catch (error) {
      console.error('Erreur reseau:', error);
    }
  }

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
    } else {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp == null || decodedToken.exp < Date.now() / 1000) {
        Cookies.remove('token');        
        router.push('/login');
      }
    }
    const fetchUserData = async () => {
      const user = await getConnectedUser();
      if (user) {
        setUserData(user);
      }
    };
    fetchUserData();

    const fetchProgress = async () => {
      const progressData = await getProgress();
      console.log(progressData);
      if (progressData && progressData.progress && progressData.progress.length > 0) {
        setProgress(progressData);
      } else {
        setProgress("Vous n&apos;avez pas encore fais de tutoriel.");
      }
    };
    fetchProgress();
  }, [router]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  type Role = 'ROLE_ADMIN' | 'ROLE_UTILISATEUR';

  const formatRoles = (roles: Role[]): string => {
    const roleMapping: Record<Role, string> = {
      ROLE_ADMIN: 'Admin',
      ROLE_UTILISATEUR: 'Utilisateur'
    };
  
    const formattedRoles = roles
      .filter(role => roleMapping[role])
      .map(role => roleMapping[role]);
  
    return formattedRoles.length === 1 ? formattedRoles[0] : formattedRoles.join(', ');
  };

  const handleDelete = async () => {
    const token = Cookies.get('token');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      return toast.error('API URL non configuree');
    }

    try {
      const response = await fetch(`${apiUrl}/user/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        Cookies.remove('token');
        router.push('/login');
      } else {
        const errorData = await response.json();
        console.log('Erreur de connexion:', errorData);
      }
    } catch (error) {
      console.error('Erreur reseau:', error);
    }
  }
  
  return (
    <div className='flex flex-col items-start gap-10 lg:mx-10'>
      <Card title="Voici votre profil" className=' w-full lg:w-10/12 mt-8' bg="bg-deepslate">
        <div className='w-full lg:w-1/2 lg:m-auto self-center my-10'>
          <MinecraftText className='mt-5 w-full'>
            Sur votre profil, vous avez la possibilite 
            de consulter et modifier diverses informations personnelles, 
            telles que votre adresse email et votre nom d&apos;utilisateur. 
            En plus de ces donnees, vous pouvez suivre votre progression 
            dans les tutoriels, ce qui vous permet de 
            voir où vous en êtes et quels chapitres vous avez dejà completes.
          </MinecraftText>
        </div>
      </Card>
      <Card title='Votre compte' className='lg:w-10/12 mt-8 w-full'>
        {userData === null ? (
          <MinecraftHN as="h2">Chargement...</MinecraftHN>
        ) : (
          <>
            <MinecraftText>Email : {userData.email}</MinecraftText>
            <MinecraftText>Nom d&apos;utilisateur : {userData.username}</MinecraftText>
            <MinecraftText>Rôle : {formatRoles(userData.roles as unknown as Role[])}</MinecraftText>
            <MinecraftButton label="Se desinscrire" onClick={() => handleDelete()} className="btn btn-danger z-0"/>
          </>
        )}

        <MinecraftButton onClick={openModal} label="Editer le profil" className="btn btn-primary z-0"/>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Modifier le profil"
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <Card title="Editer votre profil." className='w-full'>
            <Form
              formFields={formFields}
              initialValues={userData || {}}
              onSubmit={async (values) => {
                await handleSubmit(values);
                closeModal();
              }}
            />
            <MinecraftButton label="Retour" onClick={closeModal}></MinecraftButton>
          </Card>
        </Modal>
      </Card>
      <Card title="Votre progression" className='lg:w-10/12 mt-8 w-full'>
        {progress === null ? (
          <MinecraftHN as="h2">Chargement...</MinecraftHN>
        ) : Array.isArray(progress.progress) && progress.progress.length > 0 ? (
          calculateTutorialProgress().map((tutorial) => (
            <div key={tutorial.id} className='mb-6 w-full'>
              <Card title={`Tutoriel : ${tutorial.title} ${tutorial.percentage}%`} className='text-xl lg:w-1/2 mb-2' bg="bg-stone">
                <MinecraftText>{tutorial.completedChapters}/{tutorial.totalChapters} chapitres finis ({tutorial.percentage}%)</MinecraftText>
                <div className='pl-4'>
                {tutorial.chapters.map((chapter: any) => (
                  <MinecraftText
                    key={chapter.id}
                    className={`ml-2 ${chapter.isCompleted ? 'text-custom-green' : 'text-white'}`}
                  >
                    {chapter.title}
                  </MinecraftText>
                ))}
                </div>
              </Card>
            </div>
          ))
        ) : (
          <MinecraftText>Vous n&apos;avez pas encore fais de tutoriel.</MinecraftText>
        )}
      </Card>
    </div>
  );
};

export default Profil;
