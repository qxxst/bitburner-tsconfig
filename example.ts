// basic_hack.js by hydroflame, updated to typescript by qxxst
// Source: https://github.com/bitburner-official/bitburner-scripts/blob/master/basic_hack.js

/** @param {NS} ns */
export async function main(ns: any) {
    const args: { help: boolean, _: string[] } = ns.flags([['help', false]]);
    const hostname: string = args._[0];
    
    if(args.help || !hostname) {
        ns.tprint("This script will generate money by hacking a target server.");
        ns.tprint(`USAGE: run ${ns.getScriptName()} SERVER_NAME`);
        ns.tprint("Example:");
        ns.tprint(`> run ${ns.getScriptName()} n00dles`);
        return;
    }

    while (true) {
        if (ns.getServerSecurityLevel(hostname) > ns.getServerMinSecurityLevel(hostname)) {
            await ns.weaken(hostname);
        } else if (ns.getServerMoneyAvailable(hostname) < ns.getServerMaxMoney(hostname)) {
            await ns.grow(hostname);
        } else {
            await ns.hack(hostname);
        }
    }
}