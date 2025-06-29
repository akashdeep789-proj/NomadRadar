require('dotenv').config();
const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const cors       = require('cors');

const adminRoutes         = require('./routes/admin');
const userRoutes          = require('./routes/user');
const serviceRoutes       = require('./routes/service');
const passwordResetRoutes = require('./routes/passwordReset');

const app = express();

/* ─── Body‑parser ────────────────────────────────────────────── */
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(bodyParser.json({ limit: '30mb', extended: true }));

/* ─── CORS (allow all origins; no cookies) ───────────────────── */
app.use(
  cors({
    origin: '*',                             // ← sab origins allowed
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  })
);
app.options('*', cors());                    // pre‑flight support

/* ─── Routes ─────────────────────────────────────────────────── */
app.use('/admin',          adminRoutes);
app.use('/admin/service',  serviceRoutes);
app.use('/user',           userRoutes);
app.use('/password-reset', passwordResetRoutes);

app.get('/', (req, res) => {
  res.send('<h1>NomadRadar backend is up and running!</h1>');
});

/* ─── Server & DB Connection ────────────────────────────────── */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected!');
    app.listen(PORT, () =>
      console.log(`Server started at port ${PORT}`)
    );
  })
  .catch((err) => console.error(err.message));
