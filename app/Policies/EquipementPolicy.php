<?php

namespace App\Policies;

use App\Models\Equipement;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class EquipementPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {

    }

    public function view(User $user, Equipement $equipement): bool
    {
    }

    public function create(User $user): bool
    {
    }

    public function update(User $user, Equipement $equipement): bool
    {
    }

    public function delete(User $user, Equipement $equipement): bool
    {
    }

    public function restore(User $user, Equipement $equipement): bool
    {
    }

    public function forceDelete(User $user, Equipement $equipement): bool
    {
    }
}
