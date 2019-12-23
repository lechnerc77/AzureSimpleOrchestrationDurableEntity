import * as df from "durable-functions"

const orchestrator = df.orchestrator(function* (context) {
    const outputs = [];

    const entityId = new df.EntityId("Counter", context.df.instanceId);

    if (context.df.isReplaying === false) {
        context.df.callEntity(entityId, "reset");
    }

    yield context.df.callEntity(entityId, "add", 1)
    outputs.push(yield context.df.callEntity(entityId, "get"));

    yield context.df.callEntity(entityId, "add", 1);
    outputs.push(yield context.df.callEntity(entityId, "get"));

    yield context.df.callEntity(entityId, "add", 1);
    outputs.push(yield context.df.callEntity(entityId, "get"));

    return outputs;
});

export default orchestrator;
