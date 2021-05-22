import React, { Fragment, useState, useContext } from "react";
import api from "../services";
import { DataContext } from "../contexts";
import DateFnsUtils from "@date-io/date-fns";
import brLocale from "date-fns/locale/pt-BR";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Grid,
  Container,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(6, 2),
  },
  firstButton: {
    marginTop: theme.spacing(1),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function Formulario(props) {
  const classes = useStyles();
  const { dadosCliente, salvarDadosCliente } = useContext(DataContext);
  const [infoFormulario, setInfoFormulario] = useState({});
  const [alerta, setAlerta] = useState({ aberto: false, tipo: "success", msg: "minha msg" });

  const abrirAlerta = (tipo = undefined, msg = undefined) => {
    setAlerta({ ...alerta, aberto: true, tipo, msg });
  };

  const fecharAlerta = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlerta({ ...alerta, aberto: false });
  };

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setInfoFormulario({
      ...infoFormulario,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await api
      .simularEmprestimo(infoFormulario)
      .then((res) => {
        salvarDadosCliente({ ...res.data.data });
        props.history.push("/resultado");
      })
      .catch((err) => {
        console.log(err.response);
        abrirAlerta("error", err.response.data.mensagem);
      });
  };

  const UFs = [
    "RO",
    "AC",
    "AM",
    "RR",
    "PA",
    "AP",
    "TO",
    "MA",
    "PI",
    "CE",
    "RN",
    "PB",
    "PE",
    "AL",
    "SE",
    "BA",
    "MG",
    "ES",
    "RJ",
    "SP",
    "PR",
    "SC",
    "RS",
    "MS",
    "MT",
    "GO",
    "DF",
  ];

  return (
    <Fragment>
      <Container component='div' maxWidth='xs'>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                variant='outlined'
                fullWidth
                name='CPF'
                label='CPF'
                onChange={handleInputChange}
                autoFocus
                value={dadosCliente.CPF}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant='outlined' fullWidth>
                <InputLabel id='uf-select-label'>UF</InputLabel>
                <Select
                  labelId='uf-select-label'
                  label='UF'
                  onChange={handleInputChange}
                  defaultValue=''
                  name='UF'
                  value={dadosCliente.UF}
                >
                  {UFs.map((uf) => (
                    <MenuItem key={uf} value={uf}>
                      {uf}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={brLocale}>
                <KeyboardDatePicker
                  autoOk
                  variant='inline'
                  inputVariant='outlined'
                  label='DATA DE NASCIMENTO'
                  format='dd/MM/yyyy'
                  fullWidth
                  name='dataNascimento'
                  required
                  InputAdornmentProps={{ position: "end" }}
                  onChange={(date) => handleInputChange({ target: { value: date, name: "dataNascimento" } })}
                  value={dadosCliente.dataNascimento}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='number'
                required
                variant='outlined'
                fullWidth
                name='valorRequerido'
                label='VALOR REQUERIDO'
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='number'
                required
                variant='outlined'
                fullWidth
                name='mesesParaPagar'
                label='MESES PARA PAGAR'
                inputProps={{ step: 1 }}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' fullWidth color='primary' className={classes.firstButton}>
                Simular
              </Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={alerta.aberto}
          autoHideDuration={6000}
          onClose={fecharAlerta}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={fecharAlerta} severity={alerta.tipo}>
            {alerta.msg}
          </Alert>
        </Snackbar>
      </Container>
    </Fragment>
  );
}
