import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { ToastContainer, toast } from 'react-toastify';
import { getDatabase, ref, set, push, onValue, remove, update } from "firebase/database";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const Todo = () => {

    let [info, setInfo] = useState({
        username: "",
        useremail: "",
        userdeg:   "",
    });
    let [todo, setTodo] = useState([]);
    let [show, setShow] = useState(false);
    let [ids, setIds] = useState("");


    let handleChange = (e)=>{
        const {name, value} = e.target;
        setInfo((prev)=>({
            ...prev,
            [name]: value,
        }))
    }

    // Data Create Code Start Here

    const db = getDatabase();
    let handleSubmit = ()=>{
        if(!info.username || !info.useremail || !info.userdeg){
            toast.error("Please input all data",{
                autoClose: 1000,
                pauseOnHover: false,
            });
        }else{ 
        set(push(ref(db, 'users')), {
            username: info.username,
            useremail: info.useremail,
            userdeg:   info.userdeg,
        }).then(()=>{
            setInfo({
                username: "",
                useremail: "",
                userdeg:   "",
            })
            toast.success("Data Successfully Created", {
                autoClose: 1000,
                pauseOnHover: false,
            })
        });
        }
    }
        // Data Create Code End Here

        // Data Read Code Start Here
        useEffect(()=>{
            const starCountRef = ref(db, 'users');
            onValue(starCountRef, (snapshot) => {
              let dataa = [];
              snapshot.forEach((x)=>{
                dataa.push({...x.val(), id: x.key})
              })
              setTodo(dataa);
            });
        },[])
        // Data Read Code End Here
        
        // Data Delete Code Start Here
        let handleDelete = (id)=>{
            remove(ref(db, 'users/' + id));
            toast.success("Data Successfully Deleted",{
                autoClose: 1000,
                pauseOnHover: false,
            })
        }
        // Data Delete Code End Here

        // Data Edit Code Start Here
        let handleEdit = (value)=>{
            setInfo({
            username: value.username,
            useremail: value.useremail,
            userdeg:   value.userdeg,
            });
            setShow(true);
            setIds(value.id);

        }
        // Data Edit Code End Here

        // Data Update Code Start Here
        let handleUpdate = ()=>{
            update(ref(db, 'users/' + ids),{
            username: info.username,
            useremail: info.useremail,
            userdeg:   info.userdeg,
            }).then(()=>{
            setInfo({
            username: "",
            useremail: "",
            userdeg:   "",
            });
            toast.success("Data Successfully Updated",{
                autoClose: 1000,
                pauseOnHover: false,
            })
            setShow(false);
            })
        }
        // Data Update Code End Here

  return (
    <>
    <Typography variant='h3' style={{textAlign: "center", padding: "15px 0px"}}>
        CRUD Project
    </Typography>
    <Container>
        <Grid container spacing={2}>
            <Grid item xs={6} className="divc">
            <TextField value={info.username} onChange={handleChange} name='username' fullWidth margin="normal" id="name" label="Enter Your Name" variant="standard" />
            <TextField value={info.useremail} onChange={handleChange} name='useremail' fullWidth margin="normal" id="email" label="Enter Your Email" variant="standard" />
            <TextField value={info.userdeg} onChange={handleChange} name='userdeg' fullWidth margin="normal" id="text" label="Enter Your Des" variant="standard" />
            
            {
                show ?
                <Button onClick={handleUpdate} variant="contained" className="btn">Update</Button>
                :
                <>
                <Button onClick={handleSubmit} variant="contained" className="btn">Submit</Button>
                <ToastContainer />
                </>

            }

            <ToastContainer />
            </Grid>
        </Grid>

        <Grid container spacing={2}>
            <Grid item xs={12} className="divc">
                <div className='main'>
                    {
                        todo.map((items, i)=>(
                            <div className='sub' key={i}>
                                <h3>Name: {items.username}</h3>
                                <h4>Designation: {items.userdeg}</h4>
                                <p>Email: {items.useremail}</p>
                                <Button onClick={()=>handleEdit(items)} variant='contained' size='small' color='secondary' style={{marginRight: "10px"}}><ModeEditIcon /></Button>
                                <Button onClick={()=>handleDelete(items.id)} variant='contained' size='small' color='error'><DeleteIcon /></Button>
                            </div>
                        ))
                    }
                </div>
            </Grid>
        </Grid>
    </Container>
    </>
  )
}

export default Todo;