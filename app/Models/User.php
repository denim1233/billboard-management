<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Cookie;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'keycloak_id',
        'role_id',
        'status_id',
        'username',
        'password',
        'full_name'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    
    protected $casts = [
        'email_verified_at' => 'datetime',
        'created_at' => 'datetime:Y-m-d\ H:i:s a',
        'updated_at' => 'datetime:Y-m-d\ H:i:s a',
        'deleted_at' => 'datetime:Y-m-d\ H:i:s a',
    ];

    protected static function boot() {
        parent::boot();

        static::creating(function ($model) {
            
            $model->created_by = Cookie::get('user_id');
            $model->updated_by = NULL;



        });

        static::updating(function ($model) {
            $model->updated_by = Cookie::get('user_id');
        });
    }
}
