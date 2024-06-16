<?php

namespace App\DTO;

class AlertDTO
{
    /**
     * Create a new class instance.
     */
    public string $localisation;
    public string $type;
    public int $proprietaire_id;
    public int $objet_id;

    /**
     * @param string $localisation
     * @param string $type
     * @param int $proprietaire_id
     * @param int $objet_id
     */
    public function __construct(string $localisation, string $type, int $proprietaire_id, int $objet_id)
    {
        $this->localisation = $localisation;
        $this->type = $type;
        $this->proprietaire_id = $proprietaire_id;
        $this->objet_id = $objet_id;
    }

}
