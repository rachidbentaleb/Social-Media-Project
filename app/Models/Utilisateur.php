<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Utilisateur extends Authenticatable
{
    use HasFactory, Notifiable;

    // Explicitly define the table name (if necessary)
    protected $table = 'utilisateurs';

    // Define which attributes can be mass-assigned
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'mdp',
        'bio',
        'photodeprofile',
    ];

    // Tell Laravel to use 'mdp' for the password field in authentication
    public function getAuthPassword()
    {
        return $this->mdp; // 'mdp' is used for password
    }

    // Relationships
    public function posts()
    {
        return $this->hasMany(post::class);
    }

    public function likes()
    {
        return $this->hasMany(likes::class);
    }

    public function commentaires()
    {
        return $this->hasMany(commentaire::class);
    }
}
