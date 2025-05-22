import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    TextField, Button, Select, MenuItem, InputLabel, FormControl, List, ListItem, ListItemText, IconButton
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const UserManagement = () => {
    const [usuarios, setUsuarios] = useState([])
    const [form, setForm] = useState({ nombre_usuario: '', contrasena_usuario: '', rol: 'estudiante' })
    const [modoEdicion, setModoEdicion] = useState(false)
    const [idEditando, setIdEditando] = useState(null)

    const fetchUsuarios = () => {
        axios.get('http://localhost:4000/api/usuarios').then(({ data }) => setUsuarios(data))
    }

    useEffect(() => {
        fetchUsuarios()
    }, [])

    const handleSubmit = () => {
        if (modoEdicion) {
            axios.put(`http://localhost:4000/api/usuarios/${idEditando}`, form).then(() => {
                resetForm()
                fetchUsuarios()
            })
        } else {
            axios.post('http://localhost:4000/api/usuarios', form).then(() => {
                resetForm()
                fetchUsuarios()
            })
        }
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/api/usuarios/${id}`).then(fetchUsuarios)
        
    }

    const handleEdit = (usuario) => {
        setForm({
            nombre_usuario: usuario.nombre_usuario,
            contrasena_usuario: '', // No mostrar contraseña
            rol: usuario.rol
        })
        setModoEdicion(true)
        setIdEditando(usuario.id)
    }

    const resetForm = () => {
        setForm({ nombre_usuario: '', contrasena_usuario: '', rol: 'estudiante' })
        setModoEdicion(false)
        setIdEditando(null)
    }

    return (
        <div style={{ padding: 16 }}>
            <h2>Gestión de Usuarios</h2>

            <form onSubmit={(e) => e.preventDefault()}>
                <TextField
                    label="Usuario"
                    value={form.nombre_usuario}
                    onChange={(e) => setForm({ ...form, nombre_usuario: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Contraseña"
                    value={form.contrasena_usuario}
                    onChange={(e) => setForm({ ...form, contrasena_usuario: e.target.value })}
                    fullWidth
                    margin="normal"
                    type="password"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Rol</InputLabel>
                    <Select
                        value={form.rol}
                        onChange={(e) => setForm({ ...form, rol: e.target.value })}
                    >
                        <MenuItem value="estudiante">Estudiante</MenuItem>
                        <MenuItem value="docente">Docente</MenuItem>
                        <MenuItem value="coordinador">Coordinador</MenuItem>
                    </Select>
                </FormControl>

                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    {modoEdicion ? 'Actualizar' : 'Crear'}
                </Button>
                {modoEdicion && (
                    <Button onClick={resetForm} style={{ marginLeft: 8 }}>
                        Cancelar
                    </Button>
                )}
            </form>

            <h3>Lista de Usuarios</h3>
            <List>
                {usuarios.map(u => (
                    <ListItem key={u.id} secondaryAction={
                        <>
                            <IconButton edge="end" onClick={() => handleEdit(u)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" onClick={() => handleDelete(u.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </>
                    }>
                        <ListItemText primary={u.nombre_usuario} secondary={`Rol: ${u.rol}`} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default UserManagement
