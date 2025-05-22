import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import { db } from "../../bd/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroInstitucion, setFiltroInstitucion] = useState("");
  const [filtroDocente, setFiltroDocente] = useState("");

  const estadosPosibles = ["Formulación", "Evaluación", "Activo", "Inactivo", "Finalizado"];

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "proyectos"));
      const projectList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectList);
    } catch (error) {
      console.error("Error al cargar los proyectos:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "proyectos", id));
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  const handleAddProgress = (id) => {
    console.log(`Agregar avances para el proyecto con ID: ${id}`);
  };

  const handleChangeEstado = async (project) => {
    const nuevoEstado = prompt("Nuevo estado (Formulación, Evaluación, Activo, Inactivo, Finalizado):");
    const observacion = prompt("Observación para el cambio de estado:");

    if (!estadosPosibles.includes(nuevoEstado)) {
      alert("Estado no válido");
      return;
    }

    const proyectoRef = doc(db, "proyectos", project.id);
    try {
      await updateDoc(proyectoRef, {
        estadoActual: { estado: nuevoEstado, observacion, fecha: new Date() },
        historialEstados: arrayUnion({ estado: nuevoEstado, observacion, fecha: new Date() })
      });
      fetchProjects();
    } catch (err) {
      console.error("Error al cambiar el estado:", err);
    }
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Proyectos", 14, 15);

    const tableColumn = ["Título", "Institución", "Área", "Estado"];
    const tableRows = [];

    projects.forEach((project) => {
      const projectData = [
        project.titulo,
        project.institucion || "No definida",
        project.area || "No definida",
        project.estadoActual?.estado || "Sin estado"
      ];
      tableRows.push(projectData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("reporte_proyectos.pdf");
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const filtrados = projects.filter((p) => {
      const coincideInstitucion = filtroInstitucion === '' || p.institucion?.toLowerCase().includes(filtroInstitucion.toLowerCase());
      const coincideDocente = filtroDocente === '' || p.integrantes?.some(i =>
        `${i.nombre} ${i.apellido}`.toLowerCase().includes(filtroDocente.toLowerCase())
      );
      return coincideInstitucion && coincideDocente;
    });

    setFilteredProjects(
      filtrados.filter((p) =>
        [p.titulo, p.institucion, p.area].some((field) =>
          field?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }, [projects, searchTerm, filtroInstitucion, filtroDocente]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Lista de Proyectos
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <input
          type="text"
          placeholder="Buscar por título, institución o área"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', flex: 1 }}
        />
        <input
          type="text"
          placeholder="Filtrar por institución"
          value={filtroInstitucion}
          onChange={(e) => setFiltroInstitucion(e.target.value)}
          style={{ padding: '8px' }}
        />
        <input
          type="text"
          placeholder="Filtrar por docente"
          value={filtroDocente}
          onChange={(e) => setFiltroDocente(e.target.value)}
          style={{ padding: '8px' }}
        />
      </Box>

      <Button onClick={handleGeneratePDF} variant="outlined" sx={{ mb: 2 }}>
        Generar Reporte PDF
      </Button>

      <List>
        {filteredProjects.map((project) => (
          <ListItem key={project.id} divider>
            <ListItemText
              primary={project.titulo}
              secondary={`Fecha de Inicio: ${
                project.fechaInicio
                  ? new Date(project.fechaInicio.seconds * 1000).toLocaleDateString()
                  : "No definida"
              }`}
            />
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton color="primary" onClick={() => handleAddProgress(project.id)}>
                <Add />
              </IconButton>
              <IconButton color="secondary" onClick={() => handleDelete(project.id)}>
                <Delete />
              </IconButton>
              <Button variant="contained" onClick={() => handleChangeEstado(project)}>
                Cambiar Estado
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>

      {filteredProjects.length === 0 && (
        <Typography variant="body1" color="textSecondary">
          No hay proyectos registrados.
        </Typography>
      )}
    </div>
  );
}
