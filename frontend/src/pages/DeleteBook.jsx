import React, {useState, useEffect} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
    .then((res)=>{
      setTitle(res.data.title);
      setAuthor(res.data.author);
      setPublishYear(res.data.publishYear);
      setLoading(false);
    })
    .catch((error)=>{
      setLoading(false);
      alert("an error happned, please check the console");
      console.log(error);
    });
  }, [])
  const Delete = () => {
    setLoading(true);
    axios.delete(`http://localhost:5555/books/${id}`)
    .then(() => {
      setLoading(false);
      enqueueSnackbar("Book Deleted successfully", {variant:'success'});
      navigate('/');
    })
    .catch((error) =>  {
      setLoading(false);
      // alert('An error happened, please check console');
      enqueueSnackbar('error', {variant:'error'});
      console.log(error);
    });
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'> Delete Book</h1>
      {loading ? <Spinner/> : (
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <h3 className='flex justify-center items-center font-bold text-2xl'>Are you sure you want to delete this book</h3>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <div
            type='text'
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >{title}</div>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <div
            type='text'
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >{author}</div>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>PublishYear</label>
          <div
            type='text'
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >{publishYear}</div>
        </div>
        <button onClick={Delete} className='bg-red-500 rounded-xl  hover:bg-sky-800 transition duration-2  m-8 p-2'> Delete</button>
      </div>)}
    </div>
  )
}

export default DeleteBook

