<?php

use App\Models\{User, Referral};
use Illuminate\Database\Seeder;

class ReferralTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user2 = User::findOrFail(2);
        $user3 = User::findOrFail(3);

        $referral2 = new Referral;
        $referral2->user_id = $user2->id;
        $referral2->token = $user2->token;
        $referral2->email = 'tony@gmail.com';
        $referral2->save();

        $referral2 = new Referral;
        $referral2->user_id = $user2->id;
        $referral2->token = $user2->token;
        $referral2->email = 'johny@gmail.com';
        $referral2->save();

        //////////////////////////////////////////////////////////////////////////
        
        $referral3 = new Referral;
        $referral3->user_id = $user3->id;
        $referral3->token = $user3->token;
        $referral3->email = 'shawn@gmail.com';
        $referral3->save();

        $referral3 = new Referral;
        $referral3->user_id = $user3->id;
        $referral3->token = $user3->token;
        $referral3->email = 'johny@gmail.com';
        $referral3->save();


    }
}
