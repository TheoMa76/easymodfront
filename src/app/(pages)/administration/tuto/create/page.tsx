import MinecraftHN from '@/components/atoms/Texts/Title/MinecraftHN';
import Card from '@/components/molecules/Card/Card';
import CreateTutorialForm from '@/components/molecules/Forms/TutoForm';
import React from 'react';

type Props = {};

const CreateTutoPage: React.FC<Props> = (props: Props) => {
  return (
    <Card title="Create a New Tutorial" className='my-8'>
      <MinecraftHN as='h1' className="text-3xl mb-4">Create a New Tutorial</MinecraftHN>
      <CreateTutorialForm />
    </Card>
  );
};

export default CreateTutoPage;
