import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Box } from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import { db } from '../../bd/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  // Función para cargar los proyectos desde Firestore
  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'proyectos'));
      const projectList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectList);
    } catch (error) {
      console.error('Error al cargar los proyectos:', error);
    }
  };

  // Función para eliminar un proyecto
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'proyectos', id));
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
    }
  };

  // Función para agregar avances (puedes personalizarla según tus necesidades)
  const handleAddProgress = (id) => {
    console.log(`Agregar avances para el proyecto con ID: ${id}`);
    // Aquí puedes abrir un modal o redirigir a otra página para agregar avances
  };

  // Cargar los proyectos al montar el componente
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Lista de Proyectos
      </Typography>
      <List>
        {projects.map((project) => (
          <ListItem key={project.id} divider>
            <ListItemText
              primary={project.titulo}
              secondary={`Fecha de Inicio: ${
                project.fechaInicio
                  ? new Date(project.fechaInicio.seconds * 1000).toLocaleDateString()
                  : 'No definida'
              }`}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="primary" onClick={() => handleAddProgress(project.id)}>
                <Add />
              </IconButton>
              <IconButton color="secondary" onClick={() => handleDelete(project.id)}>
                <Delete />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
      {projects.length === 0 && (
        <Typography variant="body1" color="textSecondary">
          No hay proyectos registrados.
        </Typography>
      )}
    </div>
  );
}