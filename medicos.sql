CREATE TABLE especialidades (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre TEXT NOT NULL
);

CREATE TABLE medicos (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre TEXT NOT NULL,
    especialidad_id BIGINT REFERENCES especialidades(id)
);

CREATE TABLE pacientes (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre TEXT NOT NULL
);

CREATE TABLE citas (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    fecha_hora TIMESTAMP NOT NULL,
    medico_id BIGINT REFERENCES medicos(id),
    paciente_id BIGINT REFERENCES pacientes(id),
    UNIQUE (fecha_hora, medico_id),
    UNIQUE (fecha_hora, paciente_id)
);
