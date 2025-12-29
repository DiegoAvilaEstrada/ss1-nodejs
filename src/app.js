const express = require('express');
const cors = require('cors');
const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/login', require('./routes/login.routes'));
app.use('/area', require('./routes/area.routes'));
app.use('/empleado', require('./routes/empleado.routes'));
app.use('/paciente', require('./routes/paciente.routes'));
app.use('/rol', require('./routes/rol.routes'));
app.use('/producto', require('./routes/producto.routes'));
app.use('/tipo_producto', require('./routes/tipoProducto.routes'));
app.use('/tratamiento', require('./routes/tratamiento.routes'));
app.use('/factura', require('./routes/factura.routes'));
app.use('/detalle_factura', require('./routes/detalleFactura.routes'));
app.use('/sesion_psicologica', require('./routes/sesionPsicologica.routes'));
app.use('/pago_sesion', require('./routes/pagoSesion.routes'));
app.use('/inventario', require('./routes/inventario.routes'));
app.use('/medicacion', require('./routes/medicacion.routes'));
app.use('/area-empleado', require('./routes/areaEmpleado.routes'));
app.use('/cuenta-empleado', require('./routes/cuentaEmpleado.routes'));
app.use('/cuenta-paciente', require('./routes/cuentaPaciente.routes'));

// Error handling middleware
const errorHandler = require('./middlewares/errorHandler.middleware');
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

