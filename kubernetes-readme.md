# Kubernetes toturial
    https://www.youtube.com/watch?v=X48VuDVv0do&t=323s
    ### Applicationn running at :
    http://52.158.211.99:1200/register/user
    brew update
    brew install hyperkit
    brew install minikube (minikube has kubectl has dependency)
    minikube start --vm-driver=hyperkit

    -----------
# Create a master node
    Go to azure portal and create a cluster  
    az acr list --resource-group omms-pep-weekly --output table  
    az aks get-credentials --resource-group eco-friendly-resource --name aks-cluster-dev-eco
    kubectl config set-context --current --namespace=omms-pep-dev

# For AKS, there are two ways to get permission to pull the image from the Azure Container Registry.
     az aks show
     az aks update -n aks-cluster-dev-weekly -g omms-pep-weekly --attach-acr laxmi
     * One is that grant the permission to the service principal which AKS cluster used. You can get the details in Grant AKS access to ACR. In this way, you just need only one service principal.
# Create a POD
    kubectl create deployment nginx-del --image=nginx    
    kubectl edit deployment nginx-del (you can see the .yaml file and edit that fie accordingly)
    kubectl get deployment
    kubectl get deployment nginx-del -o yaml > (i will get the updated configuration of my deplyment ,which reside at etcd[brain])
    kubectl get replicaset
    kubectl get pod
    kubectl get pod -o wide (for more information)
    kubectl get services
    kubectl get secret
    kubectl get namespace
    kubectl get ingress
    kubectl delete deployment nginx-del (replicaset and the pod will gone)
    minikube service mongodb-exp-service (to execute the app)

# Persistence volume 
    https://kubernetes.io/docs/tasks/configure-pod-container/configure-persistent-volume-storage/
    kubectl get pv jenkins-pv
    kubectl get pvc task-pv-claim
    kubectl delete deployment jenkins-app
    kubectl delete pvc jenkins-pv-claim
    kubectl delete pv jenkins-pv-volume
# to run any component like (deployment , services, secret, ConfigMap, Ingress)
    kubectl apply -f file_name.yaml
# If the pod is not coming up
    kubectl describe pod pod_name
    kubectl describe service service_name

# What is whitelist
    could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted.
# What is namespace  


# Ingress

        tls:
        - hosts:
            - myapp.com
            secretName: myapp-secret-tls
    