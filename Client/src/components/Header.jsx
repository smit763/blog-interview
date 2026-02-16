import React, { useState } from 'react'
import CreateBlog from './CreateBlog'
import Button from '@mui/material/Button';

const Header = ({callBack}) => {
  const [createModal, setCreateModal] = useState(false);
  return (
    <>
    <header className='flex justify-between container mx-auto py-2'>
        <h1 className='text-2xl font-semibold'>Blog page</h1>
        <Button variant="contained" onClick={()=>setCreateModal(true)}>Create Blog</Button>
    </header>
    <CreateBlog open={createModal} setOpen={setCreateModal} callBackOnSuccess={callBack} />
    </>
  )
}

export default Header