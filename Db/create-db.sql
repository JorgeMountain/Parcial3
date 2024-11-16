
-- Crear tablas
CREATE TABLE specialties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    specialty_id INT NOT NULL REFERENCES specialties(id)
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    document_number VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50)
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
('Dr. Juan Pérez', 'juan.perez@example.com', 'hashed_password_1', 1),
('Dr. María López', 'maria.lopez@example.com', 'hashed_password_2', 2),
('Dr. Carlos Rivera', 'carlos.rivera@example.com', 'hashed_password_3', 3),
('Dr. Ana Gómez', 'ana.gomez@example.com', 'hashed_password_4', 4),
('Dr. Luis Torres', 'luis.torres@example.com', 'hashed_password_5', 5);

-- Insertar pacientes
INSERT INTO patients (name, document_number, email, phone) VALUES
('Paciente 1', '123456789', 'paciente1@example.com', '555-1234'),
('Paciente 2', '987654321', 'paciente2@example.com', '555-5678'),
('Paciente 3', '456789123', 'paciente3@example.com', '555-9101'),
('Paciente 4', '321654987', 'paciente4@example.com', '555-1122'),
('Paciente 5', '789123456', 'paciente5@example.com', '555-3344'),
('Paciente 6', '654321789', 'paciente6@example.com', '555-5566'),
('Paciente 7', '159753486', 'paciente7@example.com', '555-7788'),
('Paciente 8', '753159864', 'paciente8@example.com', '555-9900'),
('Paciente 9', '258741369', 'paciente9@example.com', '555-1111'),
('Paciente 10', '147852963', 'paciente10@example.com', '555-2222');
