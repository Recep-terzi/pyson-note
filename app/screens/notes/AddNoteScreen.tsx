import { supabase } from '@/lib/supabase';
import { setNotes } from '@/redux/noteSlice';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { Image, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
interface IPropsAddNoteScreen {
    setAddNote?: any;
    title?: any;
    description?: any; 
    id?: any; 
    getUserFn?: any; 
    handleDelete?: any;
    color?:any;
    setColor?:any;

}
const AddNoteScreen: React.FC<IPropsAddNoteScreen> = ({ handleDelete,setColor, id, setAddNote, title: getTitle, description: getDescription, getUserFn,color }) => {
    const [title, setTitle] = useState(getTitle || '')
    const [description, setDescription] = useState(getDescription || '')
    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.note.user)
    const [selectColor, setSelectColor] = useState(color ? color : '')
    const addNote = async (
        title: string,
        description: string
    ) => {

        if (!user) {
            console.error('Please Login or Register.');
            return;
        }
        const { error, data } = await supabase.from('notes').insert([
            {
                title: title,
                description: description,
                user_id: user.id,
                color: selectColor
            },
        ]);

        if (error) {
            console.error('Note added error:', error.message);
        } else {
            getUserFn()
            setColor()
        }
    };

    const updateNote = async (noteId: string, newTitle: string, newDesc: string) => {
        const { error } = await supabase
            .from('notes')
            .update({ title: newTitle, description: newDesc, color: selectColor })
            .eq('id', noteId);
        getUserFn()
        if (error) {
            console.error('Update error:', error.message);
        }
    };

    const handleSave = () => {
        dispatch(setNotes({ title, description }))
        if (title && description && id) {
            updateNote(id, title, description)
        } else {
            addNote(title, description)

        }
        setAddNote(false)
        setColor()
        getUserFn()
    }

    const [allColors] = useState([
        {
            colorPath: '#fff',
        },
        {
            colorPath: '#FF9E9E',
        },
        {
            colorPath: '#FFB347',
        },
        {
            colorPath: '#FFF599',
        },
        {
            colorPath: '#9EFFFF',
        },
        {
            colorPath: '#91F48F',
        },
        {
            colorPath: '#FD99FF',
        },
        {
            colorPath: '#B69CFF',
        },
        {
            colorPath: '#624AF2',
        },
        {
            colorPath: '#C4C4C4',
        },
        {
            colorPath: '#fcddec',
        },
        {
            colorPath: '#F1F1F1',
        },
    ])
    const [openMoreMenu, setOpenMoreMenu] = useState(false)
    const darkMode = useSelector((state: any) => state.note.darkMode)
    return (
        <>
            <View className={`flex justify-between flex-row w-full items-center mb-[62px] relative z-50 `}>
                <View className='flex-row gap-4 items-center '>
                    <TouchableOpacity onPress={() => { setAddNote(false); getUserFn(); }}><Image source={require('@/assets/icons/arrow_back_24px.png')} alt='Arrow Back' className='size-6' /></TouchableOpacity>
                    <Text className={`text-[18px] ${darkMode ? 'text-white' : ''}`}>Add Note</Text>
                </View>
                <View className='flex-row gap-3 items-center'>
                    <TouchableOpacity onPress={handleSave}><Entypo name="check" size={24} color="#FFB347" /></TouchableOpacity>
                    <TouchableOpacity onPress={() => setOpenMoreMenu(!openMoreMenu)}>{darkMode ? <Image source={require('@/assets/icons/more_vert_white_24dp 2.png')} alt='More Icon' /> : <Image source={require('@/assets/icons/more_vert_black_24dp 1.png')} alt='More Icon' />}</TouchableOpacity>
                </View>
                {
                    openMoreMenu && <>

                        <View className='absolute right-0 bottom-[-270px] w-[250px] h-max  py-[22px] border-[1px] border-gray-200 bg-white shadow-lg z-50 rounded-lg'>
                            <TouchableOpacity onPress={handleDelete} className='flex-row gap-5 items-center px-[37px] mb-[22px]'><MaterialIcons name="delete" size={24} color="black" /><Text className='text-[16px] font-regular'>Delete Note</Text></TouchableOpacity>
                            <View className='h-[1px] bg-black w-full'></View>
                            <View className='px-[37px] flex-col gap-[17px] mt-[19px]'>
                                <Text className={`text-[16px] text-center font-medium ${darkMode ? 'text-white' : ''}`}>Select Colour</Text>
                                <View className="flex-row flex-wrap gap-x-[17px] gap-y-[17px] w-[100%] items-center justify-center">
                                    {allColors.map(color => (
                                        <View key={color.colorPath}>
                                            <TouchableOpacity
                                                key={color.colorPath}
                                                onPress={() => {
                                                    setSelectColor(color.colorPath);
                                                    setOpenMoreMenu(false);
                                                }}
                                                style={{ backgroundColor: color.colorPath }}
                                                className={`border-[1px] size-[24px] rounded-full ${selectColor === color.colorPath ? 'border-green-200' : 'border-gray-200'} `}
                                            />
                                            { selectColor === color.colorPath && <TouchableOpacity className='absolute left-0 right-0 bottom-0 top-0 m-auto flex items-center justify-center' onPress={handleSave}><Entypo name="check" size={16} color={selectColor === '#FFB347' ? 'green' : '#FFB347'} /></TouchableOpacity>}
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </>
                }
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <View className='flex-col gap-10 flex '>
                    <TextInput value={title} onChangeText={(text) => setTitle(text)} placeholderTextColor={'gray'} placeholder='Title' className={`border-none h-[52px] text-[48px] focus:outline-none focus:border-none text-[16px]  font-medium ${darkMode ? 'text-white' : ''}`} />
                    <TextInput value={description} onChangeText={(text) => setDescription(text)} placeholderTextColor={'gray'} placeholder='Type something...' className={`border-none  text-[23px] focus:outline-none focus:border-none ${darkMode ? 'text-white' : ''}`} multiline numberOfLines={10} style={{ textAlignVertical: 'top' }} />
                </View>
            </TouchableWithoutFeedback>

        </>
    )
}

export default AddNoteScreen