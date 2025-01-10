import mongoose from "mongoose";

const PouletSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Veuillez entrer le nom du poulet"],
    },
    lot: {
      type: String,
      required: [true, "Veuillez entrer le lot de poulet"],
    },
    dateNaissance: {
      type: Date, // Remplacé par Date pour faciliter le calcul de l'âge
      required: [true, "Veuillez entrer la date de naissance du poulet"],
    },
    image: {
      type: String,
      required: [true, "Veuillez entrer l'URL de l'image du poulet"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // Référence à un utilisateur
      ref: "UserCompany", // Collection User pour les relations
      required: [true, "L'utilisateur est requis"],
    },
    etatSante: {
      type: String,
      required: [true, "Veuillez entrer l'état de santé du poulet"],
      enum: ["normal", "malade", "soigné"], // Limiter les valeurs possibles
    },
    type: {
      type: String,
      required: [true, "Veuillez entrer le type de poulet"],
      enum: ["pondeuse", "reproducteur"], // Limiter les valeurs possibles
    },
    sex: {
      type: String,
      required: [true, "Veuillez entrer le sexe du poulet"],
      enum: ["male", "female"], // Limiter les valeurs possibles
    },
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
  }
);

// Exporter le modèle
export const PouletModel = mongoose.model("Pulet", PouletSchema);
