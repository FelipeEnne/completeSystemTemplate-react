import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaCommentAlt, FaTrash } from "react-icons/fa";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Main from "../template/Main";
import { baseUrl } from "../../utils/connection";
import { CommunicationType } from "../../utils/models";

interface CardCommunicationssProps {
  communicationArray: CommunicationType[];
  removeCommunication: (id: number) => void;
}

const CardCommunications: React.FC<CardCommunicationssProps> = ({
  communicationArray,
  removeCommunication,
}) => {
  const dateFormated = (date: string) =>
    DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED);

  return (
    <Grid container spacing={2}>
      {communicationArray.map((communication, index) => {
        return (
          <Grid
            key={communication.id}
            data-testid={`comunication-${index}`}
            item
            xs={12}
            md={6}
            pb={1}
          >
            <Card sx={{ minWidth: 275 }} variant="outlined">
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  Receiver: {communication.receiver}
                </Typography>
                <Typography sx={{ fontSize: 20 }} mb={1}>
                  {dateFormated(communication.deliveryDate)}
                </Typography>

                <Typography variant="body2" mb={1}>
                  {communication.communicationMessage}
                </Typography>

                <Typography sx={{ fontSize: 14 }} color="text.secondary" mb={1}>
                  Status: {communication.communicationStatus}
                  <br />
                  Formats: {communication.communicationFormat.join(", ")}
                </Typography>
                <Typography textAlign="right">
                  <IconButton
                    color="error"
                    onClick={() => {
                      removeCommunication(communication.id!);
                    }}
                  >
                    <FaTrash />
                  </IconButton>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

const Communications: React.FC = () => {
  const [communicationArray, SetCommunicationArray] = useState<
    CommunicationType[]
  >([]);

  const updateCommunication = async () => {
    await axios(baseUrl)
      .then((resp) => {
        SetCommunicationArray(resp.data);
      })
      .catch(() => {
        toast.error("Houve um problema", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const removeCommunication = async (id: number) => {
    await axios
      .delete(`${baseUrl}/${id}`)
      .then(() => {
        const communicationArrayUpadted = communicationArray.filter(
          (u) => u.id !== id
        );
        SetCommunicationArray(communicationArrayUpadted);
        toast.success("Comunicação deletada com sucesso", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(() => {
        toast.error("Houve um problema", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  useEffect(() => {
    updateCommunication();
  }, []);

  return (
    <Main
      icon={<FaCommentAlt />}
      title="Comunicações"
      subtitle="Plataforma de comunicação"
    >
      <ToastContainer />
      <CardCommunications
        communicationArray={communicationArray}
        removeCommunication={removeCommunication}
      />
    </Main>
  );
};

export default Communications;
