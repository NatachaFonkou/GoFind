<?php

namespace App\Policies;

use App\Models\alert;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class alertPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {

    }

    public function view(User $user, alert $alert): bool
    {
    }

    public function create(User $user): bool
    {
    }

    public function update(User $user, alert $alert): bool
    {
    }

    public function delete(User $user, alert $alert): bool
    {
    }

    public function restore(User $user, alert $alert): bool
    {
    }

    public function forceDelete(User $user, alert $alert): bool
    {
    }
}
