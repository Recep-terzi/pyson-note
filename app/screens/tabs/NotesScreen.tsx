import Container from '@/components/Container';
import { supabase } from '@/lib/supabase';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import AddNoteScreen from '../notes/AddNoteScreen';

interface IPropsNote {
  id: string;
  title: string;
  description: string;
  user_id: string;
  created_at: string;
  color:string;
}
const NotesScreen = () => {
  const [isNote, setIsNote] = useState<IPropsNote[]>([]);
  const [addNote, setAddNote] = useState(false)
  const [selectTitle, setSelectTitle] = useState('')
  const [selectId, setSelectId] = useState('')
  const [selectDescription, setSelectDescription] = useState('')
  const [selectColor,setSelectColor] = useState('')
  const user = useSelector((state: any) => state.note.user)
  const notes = useSelector((state:any) => state.note.notes)
  const getUserNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Get notes failed:', error.message);
      return [];
    }
    setIsNote(data)
    return data;

  };

  useEffect(() => {
    getUserNotes()
  }, [notes])
  
  const handleDelete = async () => {
          const { error } = await supabase
              .from('notes')
              .delete()
              .eq('id', selectId); 
  
          if (error) {
              console.error('Error:', error.message);
          } else {
              setAddNote(false)
              getUserNotes()
          }
      }
      const darkMode = useSelector((state:any) => state.note.darkMode)
  return (
      <View className={`${darkMode ? 'bg-slate-900' : ''} `}>
        <Container>
    {
        !addNote ? <>
         <Text className={`text-[36px] font-medium ${darkMode ? 'text-white' : ''}`}>NOTES</Text>
          {isNote.length <= 0 ? <TouchableOpacity onPress={() => setAddNote(true)} className='flex flex-col gap-5 items-center absolute top-0 bottom-0 left-0 right-0 my-auto justify-center'>
            <Image source={require('@/assets/images/rafiki.png')} alt="Don't have notes" />
            <Text className='text-[20px] font-light'>Create your first note !</Text>
          </TouchableOpacity> : 
            <FlatList keyExtractor={item => item.id} className='mt-10 flex flex-col gap-5 mb-20'  showsVerticalScrollIndicator={false} data={isNote} renderItem={({ item }) =>
              <TouchableOpacity  onPress={() => { setSelectTitle(item.title); setSelectId(item.id); setSelectColor(item.color); setSelectDescription(item.description); setAddNote(true) }} style={{backgroundColor:`${item.color ? item.color : '#FFB347'}`}} className={`flex flex-col gap-3 w-full h-max  mb-5 py-5 pl-8 rounded-md`}>
                <Text className='text-[24px] font-bold'>{item.title}</Text>
                <Text className='text-[18px] font-medium'>{item.description}</Text>
              </TouchableOpacity>
            } />
          }</> : <AddNoteScreen handleDelete={handleDelete} setColor={setSelectColor} setAddNote={setAddNote} id={selectId} title={selectTitle} color={selectColor} description={selectDescription} getUserFn={getUserNotes} />
      }
      {
        (!addNote) ? <TouchableOpacity onPress={() => { setAddNote(true); setSelectTitle(''); setSelectDescription(''); setSelectId('') }} className='absolute size-[72px] rounded-full bg-primary items-center justify-center right-[30px] bottom-[100px] shadow-md'>
          <FontAwesome6 name="add" size={48} color="white" />
        </TouchableOpacity> : null
      }
    </Container>
      </View>
  )
}

export default NotesScreen