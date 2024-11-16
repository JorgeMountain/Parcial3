-- Crear tablas
CREATE TABLE specialties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    specialty_id INT NOT NULL REFERENCES specialties(id)
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);


CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    doctor_id INT NOT NULL REFERENCES doctors(id),
    patient_id INT NOT NULL REFERENCES patients(id),
    date DATE NOT NULL,
    time TIME NOT NULL,
    UNIQUE(doctor_id, date, time),
    UNIQUE(patient_id, date, time)
);

-- Insertar especialidades
INSERT INTO specialties (name) VALUES 
('Medicina General'), 
('Cardiología'), 
('Urología'), 
('Fisiología'), 
('Pediatría');

-- Insertar médicos
INSERT INTO doctors (name, email, password, specialty_id) VALUES
('Dr. Juan Pérez', 'juan.perez@example.com', '12345', 1),
('Dr. María López', 'maria.lopez@example.com', '12345', 2),
('Dr. Carlos Rivera', 'carlos.rivera@example.com', '12345', 3),
('Dr. Ana Gómez', 'ana.gomez@example.com', '12345', 4),
('Dr. Luis Torres', 'luis.torres@example.com', '12345', 5),
('Dr. Luis Torres', 'luis.torres@example.com', '12345', 6);

-- Insertar pacientes
INSERT INTO doctors (name, age, email, password, specialty_id)
VALUES
    ('John Carter', '45', 'john.carter@example.com', '12345', 1),
    ('Lisa Cuddy', '50', 'lisa.cuddy@example.com', '12345', 2),
    ('Gregory House', '55', 'gregory.house@example.com', '12345', 3),
    ('Allison Cameron', '40', 'allison.cameron@example.com', '12345', 1);
