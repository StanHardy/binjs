#!/bin/bash

#########################
# BASH SHELL SCRIPT
# CHECK BIN
# API BY SHINRYUJIN.NET
#########################
# CODE BY : SHINRYU.
#########################

if [[ ! -d output_binsh ]]; then
	mkdir -p output_binsh
fi

if [[ ! -d output_binsh_bin ]]; then
	mkdir -p output_binsh_bin
fi
check()
{


local dantoi=$(curl -s "https://apiv1.shinryujin.net/bin.php?bin=${1}" -H  \
	      -H 'User-Agent: BinSH-APP' \
	      -H  'Accept-Version: 3')

echo $dantoi

}

pardantoi()
{
	subx=$(echo ${1} | cut -c 1-6 )
	parsing=$(check ${subx})
	
	if [[ $parsing =~ "brand" ]]; then
		brand=$(echo $parsing | jq '.brand' | sed 's|"||g' )
		type=$(echo $parsing | jq '.type'  | sed 's|"||g' )
		bank=$(echo $parsing | jq '.bank' | sed 's|"||g' )
		level=$(echo $parsing | jq '.level' | sed 's|"||g' )
		country=$(echo $parsing | jq '.country' | sed 's|"||g' )
	

		save=$(echo "[ $subx ] ( $country )  $brand $type $bank $level" | tr '[:lower:]' '[:upper:]' )
		
		echo $save
		echo ${1} >> output_binsh/$country.txt
		echo "$save" >> output_binsh_bin/$country.txt

	else
		echo $parsing
		echo "${1} => SKIP CHECKER ERROR , SAVED AT UNCHECK.TXT !! "
		echo ${1} >> uncheck.txt
	fi
}
echo -n "FILE TO CHECK >>"; read file
hmm=$(cat $file | tr "\n" "\n")

for dantoi in $hmm
do
	 ((cthread=cthread%10)); ((cthread++==0)) && wait
	
	pardantoi ${dantoi} &
	
done
