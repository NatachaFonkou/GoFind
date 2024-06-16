<?php

namespace App\DTO;

class EquipementDTO
{
    /**
     * Create a new class instance.
     */
    public $nom;
    public $marque;
    public $type;
    public $etat_objet;
    public $vole;

    /**
     * @param $nom
     * @param $marque
     * @param $type
     * @param $etat_objet
     * @param $vole
     */
    public function __construct($nom, $marque, $type, $etat_objet, $vole)
    {
        $this->nom = $nom;
        $this->marque = $marque;
        $this->type = $type;
        $this->etat_objet = $etat_objet;
        $this->vole = $vole;
    }

}
