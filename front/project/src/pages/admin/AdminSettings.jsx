import React , { useState } from "react";

import { AddAdmin } from "../../components/adminComponent/AddAdmin";
import { AddWallet } from "../../components/adminComponent/AddWallet";

export function AdminSettings(){
    return (
        <section>
            <div>
                <h2> ADMIN SETTINGS </h2>
            </div>
            <div>
                <div>
                    <AddWallet/>
                </div>
                <div>
                    <AddAdmin/>
                </div>

            </div>
            
        </section>
    )
}