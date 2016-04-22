dir
robocopy /MIR /nfl /ndl /njh /ns /nc /np BankOpenNodeTsApi\Auth2Server_AllGrands C:\inetpubNodeDeploys\3000_Auth2Server_AllGrands
robocopy /MIR /nfl /ndl /njh /ns /nc /np BankOpenNodeTsApi\OBPNodeTsApi C:\inetpubNodeDeploys\3005_OBPNodeTsApi
cd C:\inetpubNodeDeploys\3005_OBPNodeTsApi
dir
npm run tsc
dir