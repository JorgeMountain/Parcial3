-- Insertar especialidades
INSERT INTO especialidades (nombre) VALUES
('Medicina General'),
('Cardiología'),
('Urología'),
('Fisiología'),
('Pediatría');

-- Insertar médicos
INSERT INTO medicos (nombre, email, password, especialidad_id) VALUES
('Dr. Juan Pérez', 'juan.perez@example.com', 'hashed_password1', 1),
('Dra. Ana Gómez', 'ana.gomez@example.com', 'hashed_password2', 2),
('Dr. Carlos Ruiz', 'carlos.ruiz@example.com', 'hashed_password3', 3),
('Dra. Laura Fernández', 'laura.fernandez@example.com', 'hashed_password4', 4),
('Dr. Pedro Martínez', 'pedro.martinez@example.com', 'hashed_password5', 5);

-- Insertar pacientes
INSERT INTO pacientes (nombre, email, password) VALUES
('Paciente 1', 'paciente1@example.com', 'hashed_password1'),
('Paciente 2', 'paciente2@example.com', 'hashed_password2'),
('Paciente 3', 'paciente3@example.com', 'hashed_password3'),
('Paciente 4', 'paciente4@example.com', 'hashed_password4'),
('Paciente 5', 'paciente5@example.com', 'hashed_password5'),
('Paciente 6', 'paciente6@example.com', 'hashed_password6'),
('Paciente 7', 'paciente7@example.com', 'hashed_password7'),
('Paciente 8', 'paciente8@example.com', 'hashed_password8'),
('Paciente 9', 'paciente9@example.com', 'hashed_password9'),
('Paciente 10', 'paciente10@example.com', 'hashed_password10');