import React, { useState, useEffect } from 'react';
import { MdAddCircle } from 'react-icons/md';
import { RiEditCircleFill } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';
import { Dialog } from '@headlessui/react';
import popUpAdd from './popUpAdd';
import popUpEdit from './popUpEdit';


function AddEditDel( {topicNum, setTopicNum, retrieveAllLeetCode, addIsOpen, setAddIsOpen, editIsOpen, setEditIsOpen, leetCodeEntry, setLeetCodeEntry} ) {


    const onAddLeetCode = async () => {
        setAddIsOpen(true);
        console.log("ADD IS OPEN: ", {addIsOpen});
    }

    const onEditLeetCode = async () => {
        setLeetCodeEntry(leetCodeEntry);
        setEditIsOpen(true);
        console.log("EDIT IS OPEN: ", {editIsOpen});
    }

    const onDeleteLeetCode = async () => {
        const response = await fetch(`/delete/${leetCodeEntry._id}`, { method: 'DELETE' });
        if (response.status === 204) {
            retrieveAllLeetCode();
            setTopicNum(1);
            console.log("Successfully deleted a LeetCode entry from the DB");
        }
        else {
            console.error("Failed to delete the LeetCode entry from the DB");
        }
    } 
    
    return (
        <>
            <MdAddCircle onClick={() => onAddLeetCode()} className='add' />
            <RiEditCircleFill onClick={() => onEditLeetCode() } className='edit' />
            <TiDelete onClick={() => onDeleteLeetCode()} className='del' />
        </>
    )

}

export default AddEditDel;