<?php

namespace App\DTO;

class PhotoDTO
{
    /**
     * Create a new class instance.
     */
    public $lien;
    public $equipements_id;

    /**
     * @param $lien
     * @param $equipements_id
     */
    public function __construct($lien, $equipements_id)
    {
        $this->lien = $lien;
        $this->equipements_id = $equipements_id;
    }

}
