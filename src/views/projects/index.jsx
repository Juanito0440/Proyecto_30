import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale/es';
import { db } from '../../bd/firebase';
import { collection, addDoc } from 'firebase/firestore';
import ProjectList from './ProjectList';

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    area: '',
    objetivos: '',
    fechaInicio: null,
    fechaFin: null,
    presupuesto: '',
    institucion: '',
    integrantes: [{ nombre: '', apellido: '', identificacion: '', gradoEscolar: '' }],
    observaciones: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleIntegranteChange = (index, field, value) => {
    const updatedIntegrantes = [...formData.integrantes];
    updatedIntegrantes[index][field] = value;
    setFormData({ ...formData, integrantes: updatedIntegrantes });
  };

  const addIntegrante = () => {
    setFormData({
      ...formData,
      integrantes: [...formData.integrantes, { nombre: '', apellido: '', identificacion: '', gradoEscolar: '' }],
    });
  };

  const removeIntegrante = (index) => {
    const updatedIntegrantes = formData.integrantes.filter((_, i) => i !== index);
    setFormData({ ...formData, integrantes: updatedIntegrantes });
  };

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, 'proyectos'), formData);
      console.log('Proyecto registrado con ID:', docRef.id);
      setModalOpen(false);
      setFormData({
        titulo: '',
        area: '',
        objetivos: '',
        fechaInicio: null,
        fechaFin: null,
        presupuesto: '',
        institucion: '',
        integrantes: [{ nombre: '', apellido: '', identificacion: '', gradoEscolar: '' }],
        observaciones: '',
      });
    } catch (error) {
      console.error('Error al registrar el proyecto:', error);
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
        Registrar Proyecto
      </Button>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Registrar Proyecto</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Título"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Área"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Objetivos"
                  name="objetivos"
                  value={formData.objetivos}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="Fecha de Inicio"
                  value={formData.fechaInicio}
                  onChange={(value) => handleDateChange('fechaInicio', value)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="Fecha de Finalización (opcional)"
                  value={formData.fechaFin}
                  onChange={(value) => handleDateChange('fechaFin', value)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Presupuesto"
                  name="presupuesto"
                  value={formData.presupuesto}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Institución"
                  name="institucion"
                  value={formData.institucion}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <h4>Integrantes del equipo</h4>
                {formData.integrantes.map((integrante, index) => (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={3}>
                      <TextField
                        fullWidth
                        label="Nombre"
                        value={integrante.nombre}
                        onChange={(e) => handleIntegranteChange(index, 'nombre', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        fullWidth
                        label="Apellido"
                        value={integrante.apellido}
                        onChange={(e) => handleIntegranteChange(index, 'apellido', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        fullWidth
                        label="Identificación"
                        value={integrante.identificacion}
                        onChange={(e) => handleIntegranteChange(index, 'identificacion', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField
                        fullWidth
                        label="Grado Escolar"
                        value={integrante.gradoEscolar}
                        onChange={(e) => handleIntegranteChange(index, 'gradoEscolar', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <Button color="secondary" onClick={() => removeIntegrante(index)}>
                        Eliminar
                      </Button>
                    </Grid>
                  </Grid>
                ))}
                <Button onClick={addIntegrante}>Agregar Integrante</Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Observaciones"
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <ProjectList />
    </>
  );
}


