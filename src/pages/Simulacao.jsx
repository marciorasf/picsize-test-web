import React, { Fragment, useState, useContext, useEffect } from "react";
import api from "../services";
import { DataContext } from "../contexts";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Container,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { ArrowForward as ArrowForwardIcon, ArrowBack as ArrowBackIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(6, 2),
  },
  firstButton: {
    marginTop: theme.spacing(1),
  },
  gridTwoRows: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: 12,
    fontWeight: 900,
    color: "#858585",
  },
  value: {
    fontSize: 20,
    fontWeight: 500,
  },
  table: {
    maxHeight: "50vh",
    marginTop: theme.spacing(1.5),
  },
  tableCellTotal: {
    fontWeight: 900,
    color: "#444444",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function Simulacao(props) {
  const classes = useStyles();
  const { dadosCliente, salvarDadosCliente } = useContext(DataContext);

  useEffect(() => {
    if (!dadosCliente.hasOwnProperty("CPF")) props.history.push("/");
  });

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    api
      .efetivarEmprestimo(dadosCliente)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        abrirAlerta("success", res.data.mensagem);
      })
      .catch((err) => {
        console.log(err);
        abrirAlerta("error", err.response.data.mensagem);
      });
  };

  const fazerOutraSimulacao = () => {
    salvarDadosCliente({ ...dadosCliente, valorRequerido: null, mesesParaPagar: null });
    props.history.push("/");
  };

  return (
    <Fragment>
      <Container component='div' maxWidth='xs'>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={6} className={classes.gridTwoRows}>
              <span className={classes.label}>VALOR REQUERIDO:</span>
              <span className={classes.value}>{dadosCliente.valorRequerido}</span>
            </Grid>
            <Grid item xs={6} className={classes.gridTwoRows}>
              <span className={classes.label}>TAXA DE JUROS:</span>
              <span className={classes.value}>{dadosCliente.taxaJuros}</span>
            </Grid>
            <Grid item xs={12} className={classes.gridTwoRows}>
              <span className={classes.label}>PAGAR EM:</span>
              <span className={classes.value}>{dadosCliente.mesesParaPagar} meses</span>
            </Grid>
            <Grid item xs={12} className={classes.gridTwoRows}>
              <span className={classes.label}>PROJEÇÃO DAS PARCELAS:</span>
              <TableContainer className={classes.table}>
                <Table className={classes.table} size='small'>
                  <TableBody>
                    {dadosCliente.dataParcelas
                      ? dadosCliente.dataParcelas.map((data) => (
                          <TableRow key={data}>
                            <TableCell scope='row'>{data}</TableCell>
                            <TableCell align='right'>{dadosCliente.valorParcela}</TableCell>
                          </TableRow>
                        ))
                      : null}
                    <TableRow key='total'>
                      <TableCell scope='row' className={classes.tableCellTotal}>
                        TOTAL
                      </TableCell>
                      <TableCell align='right' className={classes.tableCellTotal}>
                        {dadosCliente.valorTotal}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                variant='contained'
                fullWidth
                color='primary'
                className={classes.firstButton}
                endIcon={<ArrowForwardIcon />}
              >
                EFETIVAR O EMPRÉSTIMO
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                type='button'
                variant='contained'
                fullWidth
                color='secondary'
                startIcon={<ArrowBackIcon />}
                onClick={fazerOutraSimulacao}
              >
                FAZER OUTRA SIMULAÇÃO
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
