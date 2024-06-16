<?php

namespace App\Policies;

use App\Models\Photo;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PhotoPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {

    }

    public function view(User $user, Photo $photo): bool
    {
    }

    public function create(User $user): bool
    {
    }

    public function update(User $user, Photo $photo): bool
    {
    }

    public function delete(User $user, Photo $photo): bool
    {
    }

    public function restore(User $user, Photo $photo): bool
    {
    }

    public function forceDelete(User $user, Photo $photo): bool
    {
    }
}
