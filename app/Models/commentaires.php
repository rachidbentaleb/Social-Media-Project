<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class commentaires extends Model
{
    /** @use HasFactory<\Database\Factories\CommentairesFactory> */
    use HasFactory;

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }

    public function posts()
    {
        return $this->belongsTo(posts::class);
    }

    public function comment()
    {
        return $this->belongsTo(commentaires::class);
    }
}
